package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

func handleProxy(w http.ResponseWriter, r *http.Request) {
	apiUrl := os.Getenv("API_URL")

	if len(apiUrl) == 0 {
		http.Error(w, "Configuración incorrecta la url del api no está definida", http.StatusInternalServerError)
		return
	}

	// creamos la url del API
	targetURL := apiUrl + r.URL.Path

	// en caso de tener query en la url
	if len(r.URL.RawQuery) > 0 {
		targetURL += "?" + r.URL.RawQuery
	}

	if strings.Contains(targetURL, "#") {
		targetURL = strings.ReplaceAll(targetURL, "#", "%23")
	}

	parsedUrl, err := url.Parse(targetURL)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// creamos el request para el API de clash
	req, err := http.NewRequest(r.Method, parsedUrl.String(), r.Body)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	defer r.Body.Close()

	// estableemos las cabeceras de authenticacion
	req.Header.Set("Content-Type", r.Header.Get("Content-Type"))
	req.Header.Set("Authorization", "Bearer "+os.Getenv("TOKEN"))

	// realizamos la peticion al API de clash
	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}

	defer resp.Body.Close()

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	// copiamos el resto de cabereceras obtenidas del servicio externo a nuestra respuesta
	for key, values := range resp.Header {
		for _, value := range values {
			w.Header().Add(key, value)
		}
	}

	// establecemos el codigo del estado y copiamos el flujo del body recibido
	// al writer

	w.WriteHeader(200)
	io.Copy(w, resp.Body)
}

// habilita las cabeceras de la peticiones
func handlePreflight(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	w.WriteHeader(204)
}

func main() {
	// carga los archivo de entorno
	if err := godotenv.Load(); err != nil {
		log.Fatal(err)
	}

	// funcion que recoje todas las entradas
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodOptions {
			handlePreflight(w)
			return
		}

		handleProxy(w, r)
	})

	fmt.Println("Server proxy running in port 8080")

	log.Fatal(http.ListenAndServe(":8080", nil))
}

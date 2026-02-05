package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

const PORT = ":8080"

func panicError(e error) {
	if e != nil {
		panic(e)
	}
}
func fatalError(e error) {
	if e != nil {
		log.Fatal(e)
	}
}

func main() {
	gin.SetMode(gin.ReleaseMode)

	r := gin.Default()

	r.Static("/css", "../Client/css")
	r.Static("/js", "../Client/js")

	r.GET("/", func(c *gin.Context) {
		r.LoadHTMLGlob("../Client/*.svelte")
		c.HTML(http.StatusOK, "index.svelte", gin.H{
			"version": time.Now().Unix(),
		})
	})

	fmt.Printf("Listening on: http://localhost%s\n", PORT)
	fatalError(r.Run(PORT))
}

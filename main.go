package apstlog

import (
	"fmt"
	"html/template"
	"net/http"

	"github.com/itsubaki/apstapi"
)

func init() {
	apstapi.AppEngine()
	http.HandleFunc("/", root)
}

func root(w http.ResponseWriter, r *http.Request) {
	file, err := template.ParseFiles("asset/template/index.tmpl")
	if err != nil {
		fmt.Fprint(w, err.Error())
		return
	}
	tmpl := template.Must(file, err)
	tmpl.Execute(w, nil)
}

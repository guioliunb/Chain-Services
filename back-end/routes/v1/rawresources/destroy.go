package rawresources

import (
	"net/http"

	"github.com/gorilla/mux"
	RawResourcesModel "github.com/guioliunb/Chain-Services/back-end/models/v1/rawresources"
)

func Destroy() http.HandlerFunc{
	return func(w http.ResponseWriter, r *http.Request) {

		vars := mux.Vars(r)
		id := vars["id"]

		if err := RawResourcesModel.Destroy(id); err != nil{
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Write([]byte("Sucess"))
	}
}
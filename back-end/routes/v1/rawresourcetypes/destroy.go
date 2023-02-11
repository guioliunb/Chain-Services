package rawresourcetypes

import (
	"net/http"

	"github.com/gorilla/mux"
	RawResourceTypesModel "github.com/guioliunb/Chain-Services/back-end/models/v1/users"
)

func Destroy() http.HandlerFunc{
	return func(w http.ResponseWriter, r *http.Request) {

		vars := mux.Vars(r)
		id := vars["id"]

		if err := RawResourceTypesModel.Destroy(id); err != nil{
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Write([]byte("Sucess"))
	}
}
package rawresourcetypes

import (
	"net/http"

	"github.com/gorilla/mux"
	rawresourcetypesModel "github.com/guioliunb/Chain-Services/back-end/models/v1/rawresourcetypes"
)

func Destroy() http.HandlerFunc{
	return func(w http.ResponseWriter, r *http.Request) {

		vars := mux.Vars(r)
		id := vars["id"]

		if err := rawresourcetypesModel.Destroy(id); err != nil{
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Write([]byte("Sucess"))
	}
}
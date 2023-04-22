package rawresources

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"

	RawResourcesModel "github.com/guioliunb/Chain-Services/back-end/models/v1/rawresources"
)

func Show() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		vars := mux.Vars(r)
		id := vars["id"]

		rawResource, err := RawResourcesModel.Show(id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		packet, err := json.Marshal(rawResource)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Write(packet)
	}
}

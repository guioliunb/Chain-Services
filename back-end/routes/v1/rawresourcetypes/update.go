package rawresourcetypes

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/guioliunb/Chain-Services/back-end/models"
	RawResourceTypesModel "github.com/guioliunb/Chain-Services/back-end/models/v1/rawresourcestypes"
)

func Update() http.HandlerFunc{
	return func(w http.ResponseWriter, r *http.Request) {

		vars := mux.Vars(r)
		id := vars["id"]

		var opts RawResourceTypesModel.UpdateOpts
		var rawresourcetype models.RawResourceType
		decoder := json.NewDecoder(r.Body)
		defer r.Body.Close()
		err := decoder.Decode(&rawresourcetype)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		if r.Method == "PUT"{
			opts.Replace = true
		}
		updatedRawResourceType, err := RawResourceTypesModel.Update(id, &rawresourcetype, &opts)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		packet , err := json.Marshal(updatedRawResourceType)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Write(packet)
	}
}
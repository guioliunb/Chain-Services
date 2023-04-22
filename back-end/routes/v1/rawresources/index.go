package rawresources

import (
	"encoding/json"
	"fmt"
	"net/http"

	RawResourcesModel "github.com/guioliunb/Chain-Services/back-end/models/v1/rawresources"
)

func Index() http.HandlerFunc{
	return func(w http.ResponseWriter, r *http.Request) {
		rawresources, err := RawResourcesModel.Index()

		if err != nil{
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		packet, err := json.Marshal(rawresources)

		if err != nil{
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		fmt.Printf("Current RawResource: %s \n", packet );
		w.Write(packet)
	}
}
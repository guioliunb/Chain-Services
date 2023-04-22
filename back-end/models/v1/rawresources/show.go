package rawresources

import (
	"errors"

	"github.com/guioliunb/Chain-Services/back-end/models"
)

func Show(id string) (*models.RawResource, error) {

	for index, rawresource := range mockRawResources {
		if rawresource.ID == id {
			return &mockRawResources[index], nil
		}
	}

	return nil, errors.New("unable to find rawresource")
}
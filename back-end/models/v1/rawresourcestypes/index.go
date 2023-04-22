package rawresourcetypes

import (
	"github.com/guioliunb/Chain-Services/back-end/models"
)

func Index() (rawresourcetypes * models.RawResourceTypes, err error){
	rawresourcetypes = &mockRawResourceTypes	
	return
}
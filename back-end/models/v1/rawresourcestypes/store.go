package rawresourcetypes

import "github.com/guioliunb/Chain-Services/back-end/models"

func Store(name string)(rawresourcetype *models.RawResourceType, err error){

	rawresourcetype, err = models.NewRawResourceType(name)

	if err != nil{
		return
	}

	mockRawResourceTypes = append(mockRawResourceTypes, *rawresourcetype)

	return
}
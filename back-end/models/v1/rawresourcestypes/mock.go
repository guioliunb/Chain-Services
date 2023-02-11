package rawresourcetypes

import (
	"github.com/guioliunb/Chain-Services/back-end/models"
)

var mockRawResourceTypes models.RawResourceTypes

func init(){
	
	agent1 , _ :=models.NewRawResourceType("writer")
	agent2 , _ :=models.NewRawResourceType("supervisor")
	agent3 , _ :=models.NewRawResourceType("manager")

	mockRawResourceTypes = models.RawResourceTypes{
		*agent1,
		*agent2,
		*agent3,
	}
}
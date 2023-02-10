package users

import (
	"errors"

	"github.com/guioliunb/Chain-Services/back-end/models"
)

func Destroy(id string, usr *models.User) (error){

	var exists bool

	for index, user := range mockUsers{
		if user.ID == id{
			mockUsers = append(mockUsers[:index], mockUsers[index+1:]... )
			exists = true
		}
	}

	if !exists {
		return errors.New("Unable to delete user selected") 
	}

	return nil
}
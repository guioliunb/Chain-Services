package users

import (
	"errors"

	"github.com/guioliunb/Chain-Services/back-end/models"
)

func Update(id string, usr *models.User) (*models.User, error){

	var exists bool

	for index, user := range mockUsers{
		if user.ID == id{
			mockUsers[index] = *usr
			exists = true
		}
	}

	if !exists {
		return nil, errors.New("Unable to update user selected") 
	}

	return usr, nil
}
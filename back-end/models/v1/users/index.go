package users

import (
	"github.com/guioliunb/Chain-Services/back-end/models"
)

func Index() (users * models.Users, err error){
	users = &mockUsers

	return
}
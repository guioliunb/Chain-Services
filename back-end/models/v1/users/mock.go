package users

import (
	"github.com/guioliunb/Chain-Services/back-end/models"
)

var mockUsers models.Users

func init(){
	
	usr , _ :=models.NewUser("Agent1", "INFO", "agent1@mail.hy", "12345")

	mockUsers = models.Users{
		*usr,
	}
}
package users

import (
	"net/http"
)

func Index() http.HandlerFunc{
	return func(w http.ResponseWriter, r *http.Request) {
		users, err := UsersModel
	}
}
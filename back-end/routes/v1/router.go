package v1

import (
	"log"
	"net/http"

	"github.com/guioliunb/Chain-Services/back-end/models"
	UsersHandler "github.com/guioliunb/Chain-Services/back-end/routes/v1/users"
)

func Middleware() func(http.Handler) http.Handler{
	return func(next http.Handler) http.Handler{
		return http.HandlerFunc(func (w http.ResponseWriter, r *http.Request){
			log.Println("Inside V1 middleware")
			next.ServeHTTP(w, r)
		})
	}
}

func GetRoutes() map[string]models.SubRoutePackage{

	return map[string]models.SubRoutePackage{
		"/v1":{
			Middleware: Middleware(),
			Routes: models.Routes{
				models.Route{Name: "UsersIndex", Method : "GET", Pattern: "/users", HandlerFunc: UsersHandler.Index()},
			},
		},
	}
}
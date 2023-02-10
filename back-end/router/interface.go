package router

import (
	"net/http"

	"github.com/gorilla/mux"
)

type Service interface{
	GetRawRouter() *mux.Router
}

const (
	staticDir = "/static/"
)

func GetRouter() Service{
	r := Router{
		RawRouter: mux.NewRouter().StrictSlash(true),
	}

	r.RawRouter.
		PathPrefix(staticDir).
		Handler(http.StripPrefix(staticDir, http.FileServer(http.Dir("."+staticDir))))

	for _, route := range GetRoutes() {
		r.RawRouter.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(route.HandlerFunc)
	}

	return r
}
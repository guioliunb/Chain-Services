package rawresources

import (
	"github.com/guioliunb/Chain-Services/back-end/models"
)

func Index() (rawresources * models.RawResources, err error){
	rawresources = &mockRawResources

	return
}
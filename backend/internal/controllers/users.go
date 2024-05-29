package controllers

import (
	"HackathonNPCI/internal"
	"HackathonNPCI/internal/database"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/recipe/thirdparty"
)

func HandleGetUser(c *gin.Context) {
	sessionContainer := session.GetSessionFromRequestContext(c.Request.Context())
	userID := sessionContainer.GetUserID()
	info, err := thirdparty.GetUserByID(userID)

	if err != nil {
		resp := internal.CustomResponse(("failed to fetch data"), http.StatusInternalServerError)
		c.JSON(http.StatusInternalServerError, resp)
		return
	}

	fmt.Println(info.Email)

	user, err := database.GetUserByEmail(info.Email)
	if err != nil {
		fmt.Println(err)
		resp := internal.CustomResponse(("failed to fetch data"), http.StatusInternalServerError)
		c.JSON(http.StatusInternalServerError, resp)
		return
	}

	c.JSON(http.StatusOK, user)
}

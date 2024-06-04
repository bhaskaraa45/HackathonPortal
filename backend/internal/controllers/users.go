package controllers

import (
	"HackathonNPCI/internal"
	"HackathonNPCI/internal/database"
	"HackathonNPCI/internal/utils"
	"fmt"
	"log"
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
		resp := internal.CustomResponse(("session expired"), http.StatusUnauthorized)
		c.JSON(http.StatusUnauthorized, resp)
		return
	}

	fmt.Println(info.Email)

	user, err := database.GetUserByEmail(info.Email)
	if err != nil {
		fmt.Println(err)
		resp := internal.CustomResponse(("user does not exists"), http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	c.JSON(http.StatusOK, user)
}

func HandleUserExists(c *gin.Context) {
	sessionContainer := session.GetSessionFromRequestContext(c.Request.Context())
	userID := sessionContainer.GetUserID()
	info, err := thirdparty.GetUserByID(userID)

	if err != nil {
		resp := internal.CustomResponse(("session expired"), http.StatusUnauthorized)
		c.JSON(http.StatusUnauthorized, resp)
		return
	}
	log.Printf("%v wants admin access\n",info.Email)
	exits, isAdmin := database.UserExists(info.Email)

	if !exits {
		resp := internal.CustomResponse(("user does not exists"), http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	// resp := internal.CustomResponse(("user exists"), http.StatusOK)
	c.JSON(http.StatusOK, gin.H{"isAdmin": isAdmin})
}

func HandleSessionUser(c *gin.Context) {
	sessionContainer := session.GetSessionFromRequestContext(c.Request.Context())
	userID := sessionContainer.GetUserID()
	info, err := thirdparty.GetUserByID(userID)
	if err != nil {
		resp := internal.CustomResponse(("session expired"), http.StatusUnauthorized)
		c.JSON(http.StatusUnauthorized, resp)
		return
	}

	isEligible := utils.VerifyIITHEmail(info.Email)
	isRegisterd, isAdmin := database.UserExists(info.Email)

	c.JSON(http.StatusOK, gin.H{"email": info.Email, "isEligible": isEligible, "isRegisterd": isRegisterd, "isAdmin": isAdmin})
}

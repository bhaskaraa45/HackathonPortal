package controllers

import (
	"HackathonNPCI/internal"
	"HackathonNPCI/internal/database"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/recipe/thirdparty"
)

func HandleSubmussions(c *gin.Context) {
	sessionContainer := session.GetSessionFromRequestContext(c.Request.Context())
	userID := sessionContainer.GetUserID()
	info, err := thirdparty.GetUserByID(userID)
	if err != nil {
		log.Printf("Error getting user info: %v", err)
		resp := internal.CustomResponse(("session expired"), http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	var data Answer
	err = json.NewDecoder(c.Request.Body).Decode(&data)
	if err != nil {
		resp := internal.CustomResponse("invalid json data!", http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	err = database.PostSubmission(info.Email, data.Answer)

	if err != nil {
		fmt.Println(err)
		resp := internal.CustomResponse((err.Error()), http.StatusInternalServerError)
		c.JSON(http.StatusInternalServerError, resp)
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Answer submitted!"})
}

func HandleGetAllSubmussions(c *gin.Context) {
	sessionContainer := session.GetSessionFromRequestContext(c.Request.Context())
	userID := sessionContainer.GetUserID()
	info, err := thirdparty.GetUserByID(userID)
	if err != nil {
		log.Printf("Error getting user info: %v", err)
		resp := internal.CustomResponse(("session expired"), http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	log.Printf("%v tried admin access\n",info.Email)
	isRegisterd, isAdmin := database.UserExists(info.Email)

	if !isRegisterd || !isAdmin {
		resp := internal.CustomResponse(("unauthorized user"), http.StatusUnauthorized)
		c.JSON(http.StatusUnauthorized, resp)
		return
	}

	res, err := database.GetAllSubmissions()

	if err != nil {
		fmt.Println(err)
		resp := internal.CustomResponse((err.Error()), http.StatusInternalServerError)
		c.JSON(http.StatusInternalServerError, resp)
		return
	}

	c.JSON(http.StatusOK, res)
}

func HandleGetSubmussion(c *gin.Context) {
	sessionContainer := session.GetSessionFromRequestContext(c.Request.Context())
	userID := sessionContainer.GetUserID()
	info, err := thirdparty.GetUserByID(userID)
	if err != nil {
		log.Printf("Error getting user info: %v", err)
		resp := internal.CustomResponse(("session expired"), http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	res, err := database.GetSubmission(info.Email)

	if err != nil {
		fmt.Println(err)
		resp := internal.CustomResponse((err.Error()), http.StatusInternalServerError)
		c.JSON(http.StatusInternalServerError, resp)
		return
	}

	c.JSON(http.StatusOK, res)
}

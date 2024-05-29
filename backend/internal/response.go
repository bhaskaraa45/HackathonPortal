package internal

import "strconv"

func CustomResponse(msg string, statusCode int) map[string]string {
	resp := make(map[string]string)
	resp["message"] = msg
	resp["status code"] = strconv.Itoa(statusCode)

	return resp
}
package utils

import (
	"time"
)

var (
	round1Start = time.Date(2024, 7, 1, 0, 0, 0, 0, time.Local)
	round1End   = time.Date(2024, 7, 2, 23, 59, 59, 0, time.Local)

	round2Start = time.Date(2024, 7, 4, 0, 0, 0, 0, time.Local)
	round2End   = time.Date(2024, 7, 5, 23, 59, 59, 0, time.Local)

	round3Start = time.Date(2024, 8, 2, 0, 0, 0, 0, time.Local)
	round3End   = time.Date(2024, 8, 2, 23, 59, 59, 0, time.Local)
)

func WhatIsCurrentRound() (int, bool) {
	now := time.Now()

	switch {
	case now.After(round1Start) && now.Before(round1End):
		return 1, true
	case now.After(round2Start) && now.Before(round2End):
		return 2, true
	case now.After(round3Start) && now.Before(round3End):
		return 3, true
	case now.After(round1Start) && now.Before(round2Start):
		return 1, false
	case now.After(round2Start) && now.Before(round3Start):
		return 2, false
	case now.After(round3End):
		return 3, false
	default:
		return 0, false
	}
}

func GetTimeline() map[string]map[string]time.Time {
	return map[string]map[string]time.Time{
		"round1": {
			"start": round1Start,
			"end":   round1End,
		},
		"round2": {
			"start": round2Start,
			"end":   round2End,
		},
		"round3": {
			"start": round3Start,
			"end":   round3End,
		},
	}
}

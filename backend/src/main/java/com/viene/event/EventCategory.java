package com.viene.event;

import com.fasterxml.jackson.annotation.JsonValue;

public enum EventCategory {
    WORKSHOPS,
    HACKATHONS,
    MEETUPS,
    PALESTRAS,
    CONFERENCIAS,
    BOOTCAMPS,
    FEIRAS,
    DEMODAY;

    @JsonValue
    public String toJson() {
        return name().toLowerCase();
    }
}

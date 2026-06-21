package com.viene.event;

import com.fasterxml.jackson.annotation.JsonCreator;
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

    @JsonCreator
    public static EventCategory fromJson(String value) {
        return EventCategory.valueOf(value.toUpperCase());
    }
}

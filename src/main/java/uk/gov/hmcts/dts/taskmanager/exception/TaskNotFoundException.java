package uk.gov.hmcts.dts.taskmanager.exception;

import java.util.UUID;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(UUID id) {
        super("Task with id " + id + "not found. ");
    }

    public TaskNotFoundException(String message) {
        super(message);
    }
}

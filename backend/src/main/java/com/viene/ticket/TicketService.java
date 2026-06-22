package com.viene.ticket;

import com.viene.common.exception.ApiException;
import com.viene.common.exception.ResourceNotFoundException;
import com.viene.event.Event;
import com.viene.event.EventService;
import com.viene.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final EventService eventService;

    public List<Ticket> listMine(User user) {
        return ticketRepository.findByUser(user);
    }

    public Ticket generate(User user, Long eventId) {
        Event event = eventService.findApprovedById(eventId);

        if (ticketRepository.existsByUserAndEvent(user, event)) {
            throw new ApiException("Você já tem um ticket para este evento.", HttpStatus.CONFLICT);
        }

        Ticket ticket = Ticket.builder().user(user).event(event).build();
        return ticketRepository.save(ticket);
    }

    public void cancel(User user, Long eventId) {
        Event event = eventService.findApprovedById(eventId);
        Ticket ticket = ticketRepository.findByUserAndEvent(user, event)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket não encontrado."));
        ticketRepository.delete(ticket);
    }
}

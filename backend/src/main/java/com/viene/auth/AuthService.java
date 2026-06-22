package com.viene.auth;

import com.viene.auth.dto.AuthResponse;
import com.viene.auth.dto.LoginRequest;
import com.viene.auth.dto.MessageResponse;
import com.viene.auth.dto.RecoverPasswordRequest;
import com.viene.auth.dto.RegisterRequest;
import com.viene.auth.dto.RegisterResponse;
import com.viene.auth.dto.UpdateProfileRequest;
import com.viene.auth.dto.UserResponse;
import com.viene.common.exception.ApiException;
import com.viene.common.exception.EmailAlreadyInUseException;
import com.viene.common.exception.InvalidCredentialsException;
import com.viene.security.JwtService;
import com.viene.user.Role;
import com.viene.user.User;
import com.viene.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public RegisterResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new EmailAlreadyInUseException(request.email());
        }

        User user = User.builder()
                .name(request.name())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(Role.USUARIO)
                .build();

        return RegisterResponse.from(userRepository.save(user));
    }

    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        } catch (LockedException ex) {
            throw new ApiException("Sua conta foi bloqueada. Contate um administrador.", HttpStatus.FORBIDDEN);
        } catch (AuthenticationException ex) {
            throw new InvalidCredentialsException();
        }

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(InvalidCredentialsException::new);

        String token = jwtService.generateToken(user);
        return new AuthResponse(token, UserResponse.from(user));
    }

    public MessageResponse recoverPassword(RecoverPasswordRequest request) {
        // Sem envio real de e-mail nesta etapa (sem SMTP configurado). Resposta
        // genérica de propósito: não revela se o e-mail existe na base.
        return new MessageResponse("Se o e-mail existir, enviaremos as instruções de recuperação.");
    }

    public UserResponse me(User user) {
        return UserResponse.from(user);
    }

    public AuthResponse updateProfile(User user, UpdateProfileRequest request) {
        boolean emailChanged = !user.getEmail().equalsIgnoreCase(request.email());
        if (emailChanged && userRepository.existsByEmail(request.email())) {
            throw new EmailAlreadyInUseException(request.email());
        }

        user.setName(request.name());
        user.setEmail(request.email());
        user.setPhone(request.phone());
        user.setBirthdate(request.birthdate());
        User saved = userRepository.save(user);

        // Token novo: o e-mail é o subject do JWT, então um token emitido antes
        // da troca de e-mail deixaria de resolver o usuário no próximo request.
        String token = jwtService.generateToken(saved);
        return new AuthResponse(token, UserResponse.from(saved));
    }
}

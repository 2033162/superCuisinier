package com.lina.supercuisinier.dtos.utilisateur;

import com.lina.supercuisinier.models.utilisateur.Utilisateur;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UtilisateurDto {
    private String id;
    private String prenom;
    private String nomFamille;
    private String nomUtilisateur;
    private String motPasse;

    public Utilisateur toUtilisateur() {
        final Utilisateur utilisateur = new Utilisateur(
                prenom,
                nomFamille,
                nomUtilisateur,
                motPasse
        );
        long oldId;
        try {
            oldId = Integer.parseInt(id);
            if (oldId > 0)
                utilisateur.setId(oldId);
        } catch (NumberFormatException ignored) {}
        return utilisateur;
    }
}

package oslomet.webprog;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate db;

    private Logger logger = LoggerFactory.getLogger(Billett.class);

    public boolean leggTilBillett(Billett billett) {
        String sql = "INSERT INTO Billett (film, antall, fornavn, etternavn, telefonnr, epost) VALUES (?, ?, ?, ?, ?, ?)";
        try {
            db.update(sql, billett.getFilm(), billett.getAntall(), billett.getFornavn(), billett.getEtternavn(), billett.getTelefonnr(), billett.getEpost());
            return true;
        }
        catch  (Exception e) {
            logger.error("Kjøp av billett feilet: " + e);
            return false;
        }
    }

    public List<Billett> hentAlleBilletter() {
        String sql = "SELECT * FROM Billett";
        try {
            List<Billett> alleBilletter = db.query(sql, new BeanPropertyRowMapper<>(Billett.class));
            return alleBilletter;
        }
        catch (Exception e) {
            logger.error("Henting av billetter feilet: " + e);
            return null;
        }
    }

    public boolean slettAlleBilletter() {
        String sql = "DELETE FROM Billett";
        try {
            db.update(sql);
            return true;
        }
        catch (Exception e) {
            logger.error("Sletting av billetter feilet: " + e);
            return false;
        }

    }

}

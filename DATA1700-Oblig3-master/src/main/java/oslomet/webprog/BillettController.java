package oslomet.webprog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettController {

    @Autowired
    private BillettRepository rep;

    @PostMapping("/leggTilBillett")
    public void leggTilBillett(Billett billett, HttpServletResponse response) throws IOException {
        if (!rep.leggTilBillett(billett)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB - prøv igjen senere");
        }
    }

    @PostMapping("/hentAlleBilletter")
    public List<Billett> hentAlleBilletter(HttpServletResponse response) throws IOException {
        List<Billett> alleBilletter = rep.hentAlleBilletter();
        if (alleBilletter == null) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB - prøv igjen senere");
        }
        return alleBilletter;
    }

    @PostMapping("/slettAlleBilletter")
    public void slettAlleBilletter(HttpServletResponse response) throws IOException {
        if (!rep.slettAlleBilletter()) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB - prøv igjen senere");
        }
    }
}

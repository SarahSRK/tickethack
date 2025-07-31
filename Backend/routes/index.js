
var express = require("express");
var router = express.Router();
const { Client } = require('pg');
const connectionString = 'postgresql://neondb_owner:npg_QSPyc9NaFf0O@ep-silent-hall-ab29vgrq-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
const client = new Client ({ connectionString });
client.connect();

router.get('/public.tickets/:departure/:arrival/:date', (req, res) => {
    const { departure, arrival, date } = req.params;
    console.log('Requête reçue avec paramètres :', { departure, arrival, date });

    const sql = `SELECT * FROM public.tickets 
    WHERE departure = $1 AND arrival = $2 AND DATE(date) = $3`;
    console.log('SQL exécutée :', sql, [departure, arrival, date]);

    client.query(sql, [departure, arrival, date], (err, results) => {
        if (err) {
            console.error('Erreur SQL :', err);
            return res.status(500).send('Erreur serveur');
        }

        console.log('Résultat SQL brut :', results);

        if (results.rows.length === 0) {
            return res.status(404).send('No trip found');
        }

        return res.json(results.rows);
    });
});

module.exports = router;
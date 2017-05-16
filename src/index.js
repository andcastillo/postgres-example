var express = require('express')
var app = express()

const Pool = require('pg-pool');

var config = {
  user: 'postgres', //env var: PGUSER
  database: 'musica2', //env var: PGDATABASE
  password: 'mysecretpassword', //env var: PGPASSWORD
  host: 'postgres', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new Pool(config);
pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack)
})


//export the query method for passing queries to the pool
function query(text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};

// the pool also supports checking out a client for
// multiple operations, such as a transaction
function connect(callback) {
  return pool.connect(callback);
};



app.get('/saludo', function (req, res) {
  res.send('Hello World!')
})

app.get('/usuarios', function (req, res) {
	connect(function(err, client, done) {
  		if(err) {
    			return console.error('error fetching client from pool', err);
        }
  
  		//use the client for executing the query
  		client.query('SELECT * FROM usuario', function(err, result) {
    		//call `done(err)` to release the client back to the pool (or destroy it if there is an error)
    		done(err);

    		if(err) {
      			return console.error('error running query', err);
    		}
    		res.send(JSON.stringify(result.rows));
    		//output: 1
  		});
	});

})

app.get('/consulta', function (req, res) {
    connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        //use the client for executing the query
        client.query(req.param("query"), function(err, result) {
            //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
            done(err);

            if(err) {
                return console.error('error running query', err);
            }
            res.send(JSON.stringify(result.rows));
            //output: 1
        });
    });

})





app.listen(8888, function () {
  console.log('Example app listening on port 8888!')
})

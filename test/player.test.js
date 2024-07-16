const mongoose = require('mongoose');
const Player = require('../models/player');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Players', () => {
    before((done) => {
        mongoose.connect('mongodb://localhost:27017/yourDatabaseName', { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.connection.once('open', () => {
            console.log('Connected to test database');
            done();
        }).on('error', (error) => {
            console.warn('Error : ', error);
        });
    });

    beforeEach((done) => {
        Player.deleteMany({}, (err) => { 
           done();           
        });        
    });

    describe('/POST players', () => {
        it('it should POST a player', (done) => {
            let player = {
                name: "John Doe",
                position: "Forward",
                team: "Team A",
                age: 25,
                goals: 20
            }
            chai.request(server)
                .post('/api/players')
                .send(player)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql('John Doe');
                    done();
                });
        });
    });

    describe('/PUT players/:id', () => {
        it('it should UPDATE a player given the id', (done) => {
            let player = new Player({ name: "John Doe", position: "Forward", team: "Team A", age: 25, goals: 20 });
            player.save((err, player) => {
                chai.request(server)
                    .put('/api/players/' + player.id)
                    .send({ name: "Jane Doe", goals: 25 })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name').eql('Jane Doe');
                        res.body.should.have.property('goals').eql(25);
                        done();
                    });
            });
        });
    });

    describe('/DELETE players/:id', () => {
        it('it should DELETE a player given the id', (done) => {
            let player = new Player({ name: "John Doe", position: "Forward", team: "Team A", age: 25, goals: 20 });
            player.save((err, player) => {
                chai.request(server)
                    .delete('/api/players/' + player.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('success').eql(true);
                        done();
                    });
            });
        });
    });

    describe('/POST players/query', () => {
        it('it should query players by team', (done) => {
            let player = new Player({ name: "John Doe", position: "Forward", team: "Team A", age: 25, goals: 20 });
            player.save((err, player) => {
                chai.request(server)
                    .post('/api/players/query')
                    .send({ queryType: 'findByTeam', queryData: { team: 'Team A' } })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(1);
                        res.body[0].should.have.property('team').eql('Team A');
                        done();
                    });
            });
        });
    });
});

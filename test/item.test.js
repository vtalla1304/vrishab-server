const mongoose = require('mongoose');
const Item = require('../models/item');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Import the server
const should = chai.should();

chai.use(chaiHttp);

describe('Items', () => {
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
        Item.deleteMany({}, (err) => { 
           done();           
        });        
    });

    describe('/GET items', () => {
        it('it should GET all the items', (done) => {
          chai.request(server)
              .get('/api/items')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
              });
        });
    });

    describe('/POST item', () => {
        it('it should POST an item', (done) => {
            let item = {
                name: "Test Item"
            }
          chai.request(server)
              .post('/api/items')
              .send(item)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql('Test Item');
                done();
              });
        });
    });

    describe('/DELETE/:id item', () => {
        it('it should DELETE an item given the id', (done) => {
            let item = new Item({ name: "Test Item" });
            item.save((err, item) => {
                  chai.request(server)
                  .delete('/api/items/' + item.id)
                  .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('success').eql(true);
                    done();
                  });
            });
        });
    });
});

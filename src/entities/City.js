const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

@Entity()
class City {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  name;

  @Column()
  country;

  @Column('float')
  latitude;

  @Column('float')
  longitude;
}

module.exports = City;

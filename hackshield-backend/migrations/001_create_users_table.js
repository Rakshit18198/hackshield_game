/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('users', {
        id: 'id',
        name: { type: 'text', notNull: true },
        email: { type: 'text', notNull: true, unique: true },
        password: { type: 'text', notNull: true },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    });

    pgm.createIndex('users', 'email');
};

exports.down = pgm => {
    pgm.dropIndex('users', 'email');
    pgm.dropTable('users');
}; 
/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('password_reset_tokens', {
        id: 'id',
        user_id: { type: 'integer', notNull: true, references: '"users"', onDelete: 'CASCADE' },
        token: { type: 'varchar(255)', notNull: true, unique: true },
        expires_at: { type: 'timestamp', notNull: true },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });

    pgm.createIndex('password_reset_tokens', 'token');
    pgm.createIndex('password_reset_tokens', 'user_id');
};

exports.down = pgm => {
    pgm.dropTable('password_reset_tokens');
};

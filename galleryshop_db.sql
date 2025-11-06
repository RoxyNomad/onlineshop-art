-- Table: users
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table: artists
CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    artist_name TEXT NOT NULL,
    bio TEXT NOT NULL,
    portfolio_url TEXT NOT NULL,
    profile_image_url TEXT,
    cover_image_url TEXT
);

-- Table: categories
CREATE TABLE categories (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL
);

-- Table: artworks
CREATE TABLE artworks (
    id UUID PRIMARY KEY,
    artist_id INT REFERENCES artists(id),
    category_id UUID REFERENCES categories(id),
    name TEXT NOT NULL,
    base_color TEXT NOT NULL,
    price NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    image_url TEXT NOT NULL
);

-- Table: orders
CREATE TABLE orders (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    customer TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    status TEXT CHECK (status IN ('Bestellt', 'Verschickt', 'Zugestellt')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table: order_items
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id UUID REFERENCES orders(id),
    quantity INT NOT NULL,
    price NUMERIC NOT NULL,
    artwork_id UUID REFERENCES artworks(id)
);

-- Table: cart_items
CREATE TABLE cart_items (
    artwork_id UUID REFERENCES artworks(id),
    user_id UUID REFERENCES users(id),
    size_id UUID NOT NULL,
    frame_id UUID NOT NULL,
    quantity INT NOT NULL,
    artwork_name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    total_price NUMERIC NOT NULL,
    PRIMARY KEY (artwork_id, user_id, size_id, frame_id)
);

-- Table: messages
CREATE TABLE messages (
    id UUID PRIMARY KEY,
    sender_id UUID REFERENCES users(id),
    receiver_id UUID REFERENCES users(id),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE
);

-- Table: products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    artist TEXT NOT NULL,
    price NUMERIC NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT
);
import mongoose from 'mongoose';

// Direct IP connection - bypasses ISP DNS block on MongoDB SRV records entirely.
// IPs resolved from: ac-0wedhwz-shard-00-[00/01/02].gcssxkg.mongodb.net via Google DNS.
// These are stable AWS EC2 IPs for the Atlas M0 cluster in ap-south-1.
const HOSTS = '159.41.184.66:27017,159.41.162.128:27017,159.41.228.73:27017';
const REPLICA_SET = 'atlas-gcssxkg-shard-0';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

// Extract credentials and db from the SRV URI
function parseDirectUri(srvUri) {
  const m = srvUri.match(/^mongodb\+srv:\/\/([^:]+):([^@]+)@[^/]+\/([^?]*)/);
  if (!m) throw new Error('Invalid MONGODB_URI format');
  const [, user, pass, db] = m;
  const dbName = db || 'portfolioDB';
  return `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${HOSTS}/${dbName}?ssl=true&replicaSet=${REPLICA_SET}&authSource=admin&retryWrites=true&w=majority`;
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const directUri = parseDirectUri(MONGODB_URI);
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000,
      tls: true,
      tlsAllowInvalidCertificates: false,
    };
    cached.promise = mongoose.connect(directUri, opts).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;

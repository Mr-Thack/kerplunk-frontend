import { open } from 'lmdbx'
import * as fs from 'fs'
import { exec } from 'child_process'

export function getKey() {
	fs.readFile('databaseKey.key', 'utf8', (err, data) => {
	  if (err) {
	    console.error(err)
	  	exec('pkill node')
	  }
	  return data
	});
}

export function openCred() {
	//This one stores salt and verifier under username
	return open({
		path: 'credentialsDB',
		compression: false,
		maxDbs: 1,
		useVersions: true,
		encryptionKey: getKey() 
	})
}

// This can be reused for JWT's
export function openEphemeral() {
	// This one stores Ephermeral under username on RAM
	// because it's only temporary
	return open({
		path: '/tmp/ephemerals',
		compression: false,
		maxDbs: 1,
		noSync: true
	})
}

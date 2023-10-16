import prisma from "../db";

// GET All Updates

export const getUpdates = async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			belongsToId: req.user.id
		}, include: {
			updates: true
		}
	});

	const update = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates];
	}, []);
	// maps all the products and returns the updates in arrays. use array.flat
	// res.json({data: products.map(product => product.updates)});
	return res.json({data: update});
};

// GET One Update
export const getOneUpdate = async (req, res) => {
	const update = await prisma.update.findUnique({
		where: {
			id: req.params.id
		}
	});
	res.json({data: update});
}

export const createUpdate = async (req, res) => {
	// verify if product exists
	const product = await prisma.product.findUnique({
		where: {
			id: req.body.productId
		}
	});
	if(!product) {
		return res.status(404).json({error: 'Product not found'});
	}
	// create update with related productId
	const update = await prisma.update.create({
		data: req.body
	});

	res.json({ data: update });
}

export const updateUpdate = async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			belongsToId: req.user.id
		},
		include: {
			updates: true
		}
	});

	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates];
	}, []);

	const matchingUpdate = updates.find(update => update.id === req.params.id);

	if(!matchingUpdate) {
		return res.status(404).json({error: 'Update not found'});
	}

	const updatedUpdate = await prisma.update.update({
		where: {
			id: req.params.id
		},
		data: req.body
	});

	res.json({ data: updatedUpdate });
}

export const deleteUpdate = async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			belongsToId: req.user.id
		},
		include: {
			updates: true
		}
	});

	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates];
	}, []);

	const matchingDelete = updates.find(update => update.id === req.params.id);

	console.log(`DELETE UPDATE`);
	console.log(`matchingDelete`);
	console.log(matchingDelete);
	console.log(`updates`);
	console.log(updates);
	console.log(`req.params.id`);
	console.log(req.params.id);



	if(!matchingDelete) {
		return res.status(404).json({error: 'Update not found'});
	}

	const deleted = await prisma.update.delete({
		where: {
			id: req.params.id
		}
	});

	res.json({ data: deleted });

}
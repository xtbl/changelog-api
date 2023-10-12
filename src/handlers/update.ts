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


// export const getUpdates = async (req, res) => {
// 	const product = await prisma.product.findUnique({
// 		where: {
// 			id: req.user.id
// 		},
// 		include:{
// 			updates: true
// 		}
// 	});

// 	res.json({data: product.updates});
// };

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
	const id = req.params.id;
	const updated = await prisma.update.findUnique({
		where: {
			id: id
		}
	});

	res.json({ data: updated });
}

export const deleteProduct = async (req, res) => {
	const id = req.params.id;
	const deleted = await prisma.product.delete({
		where: {
			id_belongsToId: {
				id: id,
				belongsToId: req.user.id
			}
			// id: id,
			// belongsToId: req.user.id
		}
	})
	res.json({ data: deleted });
}
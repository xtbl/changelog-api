import prisma from "../db";

// GET All Products
export const getProducts = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id
		},
		include:{
			products: true
		}
	});

	res.json({data: user.products});

};

// GET One Product
export const getOneProduct = async (req, res) => {
	const id = req.params.id;
	const product = await prisma.product.findFirst({
		where: {
			id: id,
			belongsToId: req.user.id
		}
	});

	res.json({data: product});
}

export const createProduct = async (req, res) => {
	const product = await prisma.product.create({
		data: {
			name: req.body.name,
			belongsToId: req.user.id
		}
	});

	res.json({ data: product });
}

export const updateProduct = async (req, res) => {
	const id = req.params.id;
	const updated = await prisma.product.update({
		where: {
			id: id,
			belongsToId: req.user.id
		},
		data: {
			name: req.body.name
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
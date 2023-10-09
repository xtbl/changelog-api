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


// GET Product by ID
export const getProductById = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id
		},
		include:{
			products: true
		}
	});

	const product = user.products.find((product) => product.id === req.params.ProductId);

	if (product) {
		res.json({data: product});
	} else {
		res.status(404).json({message: `Product with id ${req.params.id} not found`});
	}
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
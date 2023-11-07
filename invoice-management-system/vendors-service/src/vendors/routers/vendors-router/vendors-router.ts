import {Router} from 'express';
import {Joi, Segments, celebrate} from 'celebrate';
import {StatusCodes} from 'http-status-codes';
import {VendorsService} from '../../services';

interface VendorsRouterOptions {
  vendorsService: VendorsService;
}

class VendorsRouter {
  constructor(private readonly options: VendorsRouterOptions) {}

  get router() {
    const router = Router();

    router.post(
      '/',
      celebrate({
        [Segments.BODY]: Joi.object().keys({
          name: Joi.string().required(),
          address: Joi.string().required(),
        }),
      }),
      async (req, res, next) => {
        try {
          const {name, address} = req.body;

          const vendor = await this.options.vendorsService.createVendor(
            name,
            address
          );

          return res.status(StatusCodes.CREATED).json(vendor);
        } catch (err) {
          return next(err);
        }
      }
    );

    router.get(
      '/',
      celebrate({
        [Segments.QUERY]: Joi.object().keys({
          orderBy: Joi.string(),
        }),
      }),
      async (req, res, next) => {
        try {
          const orderByQueryParam = req.query.orderBy as string;

          let orderBy: {
            field: 'name';
            direction: 'asc' | 'desc';
          }[] = [];

          if (orderByQueryParam) {
            orderBy = orderByQueryParam.split(',').map(orderByClause => {
              const [field, direction] = orderByClause.split(' ');

              if (field !== 'name') {
                throw new Error();
              }

              if (direction !== 'asc' && direction !== 'desc') {
                throw new RangeError(
                  `Invalid direction in orderBy clause ${orderByClause}`
                );
              }

              return {
                field,
                direction,
              };
            });
          }

          const vendors = await this.options.vendorsService.listVendors({
            orderBy,
          });

          return res.json(vendors);
        } catch (err) {
          return next(err);
        }
      }
    );

    router.get('/:vendorId', async (req, res, next) => {
      try {
        const {vendorId} = req.params;

        const vendor =
          await this.options.vendorsService.getVendorById(vendorId);

        return res.json(vendor);
      } catch (err) {
        return next(err);
      }
    });

    router.delete('/:vendorId', async (req, res, next) => {
      try {
        const {vendorId} = req.params;

        await this.options.vendorsService.deleteVendor(vendorId);

        return res.status(StatusCodes.NO_CONTENT).json({});
      } catch (err) {
        return next(err);
      }
    });

    return router;
  }
}

export {VendorsRouter};

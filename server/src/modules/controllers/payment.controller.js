import { PaymentService } from "../services/payment.service.js";

export class PaymentController {
  // Orders
  static async createAnOrder(req, res) {
    try {
      const payload = req.body;

      // todo: Obtencion de los datos previos de la orden -----
      // 1. Verificar que la orden no exista en la base de datos
      // 1.1 Obtenemos el numero de la orden desde el frontend
    //   const order_number = order_db.order_number;
    //   // 1.2 Si no viene, retorna un forbidden
    //   if (!order_number)
    //     return res.status(403).message("Order Number Not Found");

    //   // Consultamos la base de datos
    //   let order = (await OrdersService.getOrderByNumber(order_number)) ?? null;

    //   if (order) {
    //     if (order.status === "cancelled" || order.status === "confirmed")
    //       return res.status(403).json({
    //         message: "Order expired",
    //       });

    //     // Solo si esta "pending"
    //     // return res.status(200).json(order);
    //     return res.status(200).json({
    //       message: "ok",
    //       order_id: order.id,
    //       order_number: order_number,
    //       risk_score: RISK_SCORE,
    //       amount: order.amount,
    //       stripeId: order.merchant_order_ext_ref,
    //       clientSecret: order.revolut_token, //!
    //       fixed_fee: order.fixed_fee,
    //       // fx_fee: order.fx_fee,
    //     });
    //   }

      //todo: Calculo economico, gestiones de ordenes segun el tipo e inventario de productos -----
      // Definimos todos los costos asociados a la orden
    //   let totalAmount = 0;
    //   let totalDiscount = 0;
    //   let totalShippingCosts = 0;
    //   let taxColleted = 0;

      // Obtener precios y preparar los ítems
    //   const order_items = [];

    //   for (const item of order_db.items) {
    //     // Obtenemos el empaquetado del producto de la variante seleccionada (para mas informacion)
    //     const product = await ProductService.getById(item.product_id); // debes tener esta función en tu servicio

    //     //! Si el producto no esta disponbible para la venta, devuelve un error
    //     if (!product.available) throw new Error(`This product is unavailable`);

    //     //Obtengo la variante desde el backend para evitar modificaciones desde el front
    //     const variant = product.product_variants.find(
    //       (v) => v.id === item.variant_id,
    //     );
    //     //! Si no existe la variante, devuelve un error
    //     if (!variant) throw new Error("Variant not found: " + item.product_id);

    //     //--- FIX
    //     // Verificar el estado activo de la variante
    //     const { availability_status } = variant; //!?
    //     //! Si el estado activo, es no disponible, devuelve error
    //     if (availability_status === "unavailable")
    //       throw new Error(`${variant.title} model is unavailable`);

    //     const stockMap = {
    //       ...getAttrStock,

    //       available: {
    //         ...getAttrStock?.available,
    //         is_allowed_next: variant.preorder_allowed,
    //       },

    //       preorder: {
    //         ...getAttrStock?.preorder,
    //         is_allowed_next: variant.overbooking_allowed,
    //         estimated_days: variant.estimated_days_preorder,
    //       },

    //       overbooking: {
    //         ...getAttrStock?.overbooking,
    //         is_allowed_next: true, // siempre
    //         estimated_days: null,
    //       },
    //     };

    //     const fields = stockMap[availability_status];
    //     if (!fields)
    //       throw new Error(`Invalid availability status: ${a_status}`);

    //     const currentStock = variant[fields.stock] || 0;
    //     if (currentStock < item.quantity)
    //       throw new Error(`Not enough stock available for ${variant.title}`);

    //     const reserved = (variant[fields.reserved] || 0) + item.quantity;
    //     const restStock = currentStock - item.quantity;

    //     variant[fields.reserved] = reserved;
    //     variant[fields.stock] = restStock;

    //     // Verifica y modifica la disponibilidad del producto
    //     // si el se agota el stock, comprobar si el producto
    //     // tiene permito compras en preorder o overbooking,
    //     // en caso de que no sea asi, modificar a unavailable

    //     // let currentState = availability_status;
    //     // if (restStock === 0) {
    //     //   if (
    //     //     fields.is_allowed_next &&
    //     //     fields.next_status &&
    //     //     stockMap[fields.next_status] &&
    //     //     variant[stockMap[fields.next_status].stock] > 0
    //     //   ) {
    //     //     currentState = fields.next_status;
    //     //   } else {
    //     //     currentState = "unavailable";
    //     //   }
    //     // }

    //     const payload = {
    //       [fields.reserved]: reserved,
    //       [fields.stock]: restStock,
    //       // availability_status: currentState,
    //     };

    //     await ProductService.updateVariant(variant.id, payload);

    //     //-------------------------- Prepara la orden de pago via revolut
    //     // Calculamos el costo total (sin descuentos, ni taxes, ...)
    //     const subtotal = variant.price * item.quantity;
    //     // Calculamos el costo de envio (segun el seleccionado)
    //     const shipping_costs = item?.selected_shipping.base_cost || 0;
    //     // Obtenemos el descuento asignado a la variante
    //     const discount = variant.discountPercentage || 0;
    //     // Calculamos el subtotal (precio del producto con descuentos)
    //     const total_discount = variant.price * (discount / 100) * item.quantity;
    //     // Creamos una variable temporal con el costo final por este item
    //     const subtotal_final = subtotal - total_discount + shipping_costs;

    //     // ----- Actualizamos los valores totales que entraran en la orden de pago
    //     totalShippingCosts += shipping_costs;
    //     totalDiscount += total_discount;
    //     totalAmount += subtotal_final;

    //     //-----  Calculo de impuestos sobre los productos contra las tiendas
    //     const fee =
    //       subtotal_final *
    //       (product.store.contract.commission_base_percentage / 100);
    //     taxColleted += fee;

    //     // ? Update 5/12 2' pm -----------
    //     // Agregamos la orden a la lista (sin el id de la orden)
    //     order_items.push({
    //       // ! Estos atributo, son temporales, para stripe, luego lo saco de la lista
    //       title: variant?.title, //!
    //       description: product?.description, //!
    //       product_id: product.id,
    //       variant_id: variant.id,
    //       store_id: item.store_id,
    //       discountPercentage: variant.discountPercentage,
    //       quantity: item.quantity,
    //       unit_price: variant.price,
    //       product_shipping_option_id: item?.selected_product_shipping_id,
    //       shipping_base_cost: shipping_costs,
    //       subtotal: subtotal_final,
    //       platform_fee: fee,
    //       shipping_is_free_over: item.selected_shipping.is_free_over,
    //       shipping_method_type: item.selected_shipping.shipping_method.name,
    //       // ? Nuevo....
    //       order_type: availability_status,
    //       estimated_days: fields.estimated_days,
    //     });
    //   }

      //todo: Calculo de impuestos ------
    //   const payment_provider_fees_list =
    //     await PaymentProviderFeeService.payment_fees.getActives();
    //   const payment_provider_fees = payment_provider_fees_list[0];
    //   const fixed_fee =
    //     totalAmount * payment_provider_fees.base_percentage +
    //     payment_provider_fees.fixed_fee;
      // -----------------------------------

      // Definimos la lista de items ---------------
    //   const line_items = [
    //     ...order_items.map((i) => ({
    //       product_name: i.title || "Product", //product_name
    //       quantity: i.quantity, //quantity
    //       unit_cost: Math.round(
    //         //unit_cost
    //         (i.unit_price - i.unit_price * (i.discountPercentage / 100)) * 100,
    //       ),
    //       unit_of_measure: "unit", //unit_of_measure
    //     })),
    //     {
    //       product_name: "Platform Handling Fee", // (fee applied) product_name
    //       quantity: 1, // quantity
    //       unit_cost: Math.round(fixed_fee * 100), // 4% (at the moment)
    //     },
    //   ];

      // Calculamos el monto real
    //   const real_amount = line_items.reduce(
    //     (sum, it) => sum + it.unit_cost * it.quantity,
    //     0,
    //   );

      //! -----------------
      const userId = req.user?.sub ?? req.user?.id;

      const stripeCustomerAccount = await UsersService.getUserById(userId);

      let stripeCustomerId = stripeCustomerAccount?.stripe_customer_id;
      const billerData = order_db.billing_info; // datos de quien paga

      let stripeCustomer = null;

      if (stripeCustomerId) {
        try {
          // Asegurarse de que exista en Stripe
          stripeCustomer =
            await StripeAPIService.customers.retrieve(stripeCustomerId);
        } catch (err) {
          stripeCustomer = null; // si no existe en Stripe, se crea uno nuevo
        }
      }

      if (!stripeCustomer) {
        // Creamos un customer en Stripe usando los datos del biller
        const customer = await StripeAPIService.customers.create({
          name: `${billerData?.name}`,
          email: billerData?.email || "",
          metadata: {
            userId: userId,
          },
        });

        stripeCustomerId = customer.id;

        // Opcional: si quieres mantener un mapping en tu user
        await UsersService.updateUser(userId, {
          stripe_customer_id: stripeCustomerId,
        });
      }

      // Creo la orden de stripe, con los valores calculados
      const stripe_paymentIntent = await StripeAPIService.paymentIntent.create({
        amount: real_amount,
        currency: "usd",

        customer: stripeCustomerId,

        payment_method_types: ["card", "link"],

        metadata: {
          order_ref: order_number,
        },

        statement_descriptor: `HBCONSULTING.COM`,
        statement_descriptor_suffix: order_number.slice(-6),

        description: `Purchase on ANDINET platform`,
        receipt_email: order_db.billing_info.email,

        // Esto NO rompe nada, es solo informativo
        amount_details: {
          line_items,
        },
      });
      // console.log("STRIPE ORDER /-> ", stripe_paymentIntent);

      if (!stripe_paymentIntent?.id || !stripe_paymentIntent?.client_secret) {
        throw new Error("Invalid response from Stripe order creation");
      }

      if (!order_db.billing_info.full_address) {
        order_db.billing_info.full_address =
          `${order_db.billing_info.zip_code || ""}, ${order_db.billing_info.city || ""}, ${order_db.billing_info.state || ""}, ${order_db.billing_info.address || ""}, ${order_db.billing_info.country || ""}`
            .replace(/(, )+/g, ", ")
            .replace(/^, |, $/g, "")
            .trim();
      }

      // Si no existe la orden en la DB, creala con los datos obtenidos de stripe
      const order_payload = {
        customer_id: userId,
        order_number,
        status: "pending",
        payment_method: "stripe", //!
        delivery_info: order_db.delivery_info,
        billing_info: order_db.billing_info,
        revolut_token: stripe_paymentIntent.client_secret, //!
        checkout_url: null, //!
        merchant_order_ext_ref: stripe_paymentIntent.id, //!
        note: order_db.note || null,
        fixed_fee,
      };

      // Antes de esto se pone bueno...
      order = await OrdersService.createOrder({
        ...order_payload,
        tax_collected: taxColleted,
        total: totalAmount,
        total_discounted: totalDiscount,
      });
      // Si no se pudo crear la orden por alguna razon, retorna un error
      if (!order) throw new Error("Order could not be created");

      // ! POLITICAS ACEPTADAS POR EL USUARIO / DEVICE
      const policy_accepted = await UserPolicyAcceptancesService.create({
        user_id: userId,
        policy_id: terms.id,
        ip_address: deviceFingerprint.ip,
        user_agent: deviceFingerprint.user_agent,
        order_id: order.id,
      });
      // ! ----------------------------------

      // ! REGISTRA LA ACTIVIDAD DEL USUARIO, PREVIO AL PAGO
      const user_activity_meta = {
        order_id: order.id,
        line_items: line_items.slice(0, -1),
        amount: real_amount / 100,
        currency: "USD",
        created_at: order.created_at,
        billing_country: order_db.billing_info?.country,
        billing_zip_code: order_db.billing_info?.zip_code,
        fixed_fee,
        notes: `Checkout started, PaymentIntent created but not yet confirmed`,

        // User
        customer_id: userId,

        // Evidence of intention
        terms_accepted: true,
        terms_version: terms.version,
        user_terms_accepted_id: policy_accepted.id,

        // Evidence of purchase
        payment_gateway: "stripe",
        payment_intent_id: stripe_paymentIntent.id,

        // Evidencia of service
        providers: order_items.map((i) => i.store_id),
      };

      recordActivity(req, {
        ...COMMERCE_EVENTS.CHECKOUT_STARTED,
        metadata: user_activity_meta,
        user_email: user?.user_metadata?.email ?? "",
      });
      //! -------------------------------------------------

      // todo: Si todo o anterior se cumple, entonces, actualizamos el id de la orden por cada item
      const order_items_payload = order_items.map((item) => {
        const { title, description, ...rest } = item;
        return {
          ...rest,
          order_id: order.id,
        };
      });

      // 4. Guarda los items_order en su db
      await OrdersService.addOrderItems(order_items_payload);

      // 🔒 Verifica manipulación
      // Si alguien toca algo → rechazado. y cancelado el pedido inmediatamente
      // Por ALTO RIESGO de fraude
      if (Math.round(totalAmount * 100) !== Math.round(data.subtotal * 100)) {
        const ordersQueue = await getOrdersQueue();
        await ordersQueue.add("order-received-cancelled", {
          idReferenceAPI: stripe_paymentIntent.id,
          decline_reason: "high_risk",
        });
        return res.status(403).json({ message: "Forbidden" });
      }

      log._s(`Order has been created successfully ✅`);

      //! Devuelve momentaneamente la orden creada
      return res.status(201).json({
        message: "Order created successfully",
        order_id: order.id,
        order_number: order_number,
        risk_score: RISK_SCORE,
        amount: totalAmount,
        clientSecret: stripe_paymentIntent.client_secret,
        stripeId: stripe_paymentIntent.id,
        stripeStatus: stripe_paymentIntent.status,
        fixed_fee,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createCheckoutLink(req, res) {
    try {
      const payload = req.body;
      const response = await PaymentService.orders.create(payload);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getPaymentIntent(req, res) {
    try {
      const { id } = req.params;
      const data = await PaymentService.paymentIntent.getPaymentIntent(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Config
  static async getPublicToken(req, res) {
    try {
      const response = await PaymentService.config.getPublicToken();
      res.status(200).json({
        publicToken: response,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

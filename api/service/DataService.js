const firebase = require('../utils/DBConfig');
const Define = require('../utils/Define');
const Response = require('../utils/Response');
const db = firebase.firestore();

const DataService = {
    //generate id
    getId: (_collection) => {
        const id = db.collection(_collection).doc().id;
        return id;
    },

    //get all documents
    getDocuments: async (_collection) => {
        const docs = await db.collection(_collection).get();

        let all_doc = [];
        docs.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data()}`);
            all_doc.push(doc.data());
        });
        return new Response(false, "Fetch Documents Successfully", all_doc);
    },
    getSubCollDocuments: async (_collection, _subCollection, col_id) => {
        const docs = await db.collection(_collection).doc(col_id).collection(_subCollection).get();

        let all_doc = [];
        docs.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data()}`);
            all_doc.push(doc.data());
        });
        return new Response(false, "Fetch Documents Successfully", all_doc);
    },
    //get all documents where id=?
    getFilteredDocuments: async (_collection, _field, _value) => {
        const docs = await db.collection(_collection).where(_field, "==", _value).get();
        let all_doc = [];
        docs.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data()}`);
            all_doc.push(doc.data());
        });
        return new Response(false, "Fetch Documents Successfully", all_doc);
    },

    //get a single document
    getDocument: async (_collection, _doc_id) => {
        try {
            const doc = await db.collection(_collection).doc(_doc_id).get();
            return new Response(false, "Get Document Successfully", doc.data())
        }
        catch (e) {
            return new Response(true, `Get Document Faild , ${e.message}`, e)
        }
    },

    //add a single document
    addDocument: async (_collection, _obj) => {
        try {
            await db.collection(_collection).doc(_obj.id).set(_obj);
            return new Response(false, "Add Document Successfully", _obj)
        }
        catch (e) {
            return new Response(true, `Add Document Faild,${e.message}`, e)
        }
    },

    // update a document
    updateDocument: async (_collection, _obj) => {
        try {
            await db.collection(_collection).doc(_obj.id).set(_obj, { merge: true });
            return new Response(false, "Update Document Successfully", _obj)
        }
        catch (e) {
            return new Response(true, `Update Document Faild,${e.message}`, e)
        }
    },


    //increment a field
    incrementFiledValue: async (_collection, _id, _field, num) => {
        try {
            const increment = firebase.firestore.FieldValue.increment(num);
            const docRef = db.collection(_collection).doc(_id);
            // Update read count
            //console.log(_field);
            const obj = {}
            obj[_field] = increment
            await docRef.update(obj);
            return new Response(false, "Increment Document Successfully", { id: _id })
        }
        catch (e) {
            return new Response(true, `Increment Document Faild,${e.message}`, e)
        }
    },
    batchWriteDec: async (order_obj, product_list) => {
        try {
            const batch = db.batch();
            product_list.forEach(part => {
                //decrement for each part
                const _id = part.id
                const obj = {}
                const inc_dec = firebase.firestore.FieldValue.increment(part.part_stock * (-1));
                obj['part_stock'] = inc_dec
                const docRef = db.collection(Define.part_collection).doc(_id);
                batch.update(docRef, obj);

                //add new product in each order id
                const order_sub_col = db.collection(Define.order_collection).doc(order_obj.id).collection(Define.order_sub_collection).doc(_id)
                batch.set(order_sub_col, part)
            });
            //add new order info
            const orderref = db.collection(Define.order_collection).doc(order_obj.id)
            batch.set(orderref, order_obj);
            await batch.commit();
            return new Response(false, "Order Processed Successfully", order_obj)
        } catch (e) {
            return new Response(true, `Order Process Faild,${e.message}`, e)
        }
    },


    //delete a document
    deleteDocument: async (_collection, _obj_id) => {
        try {
            await db.collection(_collection).doc(_obj_id).delete();
            return new Response(false, "Delete Document Successfully", {})
        }
        catch (e) {
            return new Response(true, `Delete Document Faild,${e.message}`, e)
        }
    }
}

module.exports = DataService
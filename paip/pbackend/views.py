from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import permissions,status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login,logout
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, status
from rest_framework.generics import RetrieveAPIView


import environ
from . import Checksum
from django.shortcuts import render

def get_token(user):
    referesh=RefreshToken.for_user(user)
    return {
        'referesh':str(referesh),
        'access':str(referesh.access_token)
    }

class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class check(APIView):
    permission_classes=[AllowAny]
    def get(self,request):
        return Response({'connected':True})

class LoginAPIView(APIView):
    permission_classes=[AllowAny]
    def post(self,request,format=None):
            print(request.data)
            if request.data.get('email') and request.data.get('password'):
                user=authenticate(email=request.data.get('email'),password=request.data.get('password'))
                staf=request.data.get('is_staff')
                print('*******',staf)
                if user is not None:
                    
                    return Response({'login':True,'token':get_token(user)},status=status.HTTP_200_OK)
                
            return Response({'login':False})
        
class LogoutAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        logout(request)  # This line logs out the user and destroys the session
        print("user logged out")
        return Response({'message': 'User logged out successfully'}, status=status.HTTP_200_OK)



class user(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        if request.user.is_staff == True:
            print('====>isstaff')
            obj = user_info.objects
            san = UserSerializer(obj, many=True)
            return Response({'data':san.data,'is_staff':request.user.is_staff},status=status.HTTP_200_OK)
        else:   
            san = UserSerializer(request.user)
            return Response(san.data)
        
        

    def post(self,request) :
        # Set the logged-in user when saving user_info
        if request.user.is_staff == True:
            data = request.data[0]
            print('product data ********* ',data)
            data['email'] = data['email']  
            san = UserSerializer(data=data)
            if san.is_valid():
                san.save()
                print("san ==",san.data)
                return Response(san.data)
        return Response(san.errors)

    def patch(self,request):
        if request.user.is_staff == True:
            data = request.data[0]

        # Filter by user and object id
            obj = user_info.objects.filter( id=data['id']).first()
            if obj:
                san = UserSerializer(obj, data=data, partial=True)
                if san.is_valid():
                    san.save()
                    return Response(san.data)
                return Response(san.errors)
            return Response({'error': 'Object not found for the logged-in user'}, status=status.HTTP_404_NOT_FOUND)
       
class CartDetailView(APIView):
    def patch(self,request):
        data = request.data
        print('Data---------------->',data)
        usr=int(data['user_id'])
        

        cr=cart.objects.filter(user_id=usr)
        print('cr----------->',cr)
        print('san----------->',cart.objects.get('items'))
        
        if cr:
            items = data.get('item')
            san = CartSerializer(data={'user_id': usr, 'items': items})
            
            if san.is_valid():
                item=cart.objects.get('items')
                print('items -------------------->',item)
            
                san.save()
            return Response(san.data)
        return Response(san.errors)


    '''queryset = cart.objects.all()
    serializer_class = CartSerializer
    lookup_url_kwarg = 'user_id'

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        items = request.data.get('item')

        data = {'user_id': user_id, 'items': items}
        serializer = CartSerializer(data=data)
        #print('ser********',serializer)
        if serializer.is_valid():
            
            #print('------------------>',(serializer.validated_data))
            existing_cart = cart.objects.filter(user_id=user_id).first()
            
            
            if existing_cart:
                print('existing_cart.items before:', existing_cart.items)
                items_to_append = serializer.validated_data.get('items')
                existing_items = existing_cart.items
                existing_items.append(items_to_append)
                existing_cart.items = existing_items
                print('items_to_append:', existing_cart.items)

                existing_cart.save()  # Only save if modifying other fields

                return Response({'detail': 'Item added to the cart'}, status=status.HTTP_201_CREATED)
            else:
                print('elsee*****')
                
                new_cart = cart.objects.create(user_id=user_id, items=[serializer.validated_data])
                print('nw********',new_cart)
                
                
                return Response({'detail': 'Item added to a new cart'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)'''

class getcartda(APIView):

    def get(self, request):
        user_id = int(request.query_params.get('user_id'))
        carts = cart.objects.filter(user_id=user_id)
        
        if carts.exists():
            obj = carts.first()
            san = CartSerializer(obj)
            
            return Response(san.data)
        else:
            return Response({"error": "Object not found for the given user_id"}, status=404)

    def post(self, request):
        data = request.data
        user_id = int(request.query_params.get('user_id'))

        carts = cart.objects.filter(user_id=user_id)
        if carts.exists():
            obj = carts.first()
            
            existing_items = obj.items
            new_items = data.get('items', None)
            if new_items:
                existing_items['items'].append(new_items)
                obj.items =existing_items
                print(obj.items,new_items)
                obj.save()
                san = CartSerializer(obj)
            return Response({})
        else:
            san = CartSerializer(data={'user_id': user_id, 'items': data['items']})
            if san.is_valid():
                san.save()
                return Response(san.data)
            return Response(san.errors)

    def patch(self,request):
        user_id = request.query_params.get('user_id')
        item_id=request.data['id']
        print('gett***************>>>>',item_id)
        if user_id is not None and item_id is not None:
            try:
                user_id = int(user_id)
                carts = cart.objects.filter(user_id=user_id)

                if carts.exists():
                    obj = carts.first()
                    existing_items = obj.items.get('items', [])  

                    found_index = None
                    for index, item in enumerate(existing_items):
                        if item['id'] == item_id:
                            found_index = index
                            break

                    if found_index is not None:
                        existing_items.pop(found_index)
                        obj.items['items'] = existing_items
                        obj.save()
                        san = CartSerializer(obj)
                        return Response({"message": f"Product with id {item_id} deleted successfully."})
                    else:
                        return Response({"error": f"Product with id {item_id} not found in the cart."})

                else:
                    return Response({"error": f"Cart not found for user with id {user_id}"})

            except ValueError:
                return Response({"error": f"Invalid user ID: {user_id}"})
        else:
            return Response({"error": "Product ID not provided in the request."})
        
class coupons(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request) :
        # Filter coupon objects for the logged-in user
        
        obj=coupon.objects
        san = CouponSerializer(obj, many=True)
        return Response(san.data)
    

    def post(self,request) :
        # Set the logged-in user when saving coupon
        data = request.data
        data['user'] = request.user.id
        san = CouponSerializer(data=data)
        if san.is_valid():
            san.save()
            return Response(san.data)
        return Response(san.errors)

    def patch(self,request):
        data = request.data
        # Filter by user and object id
        obj = coupon.objects.filter(user=request.user, id=data['id']).first()
        if obj:
            san = CouponSerializer(obj, data=data, partial=True)
            if san.is_valid():
                san.save()
                return Response(san.data)
            return Response(san.errors)
        return Response({'error': 'Object not found for the logged-in user'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'POST','PATCH','DELETE'])
def product(request):
    if request.method == "GET":
        obj=product_info.objects.all()
        san=ProductSerializer(obj,many=True)
        return Response(san.data)
    
    elif request.method== "POST":
        data=request.data[0]
        
        san=ProductSerializer(data=data)
        if san.is_valid():
            san.save()
            
            return Response(san.data)
        return Response(san.errors)
    elif request.method == "PATCH":
        data=request.data
        obj=product_info.objects.get(id=data['id'])
        san=ProductSerializer(obj,data=data , partial=True)
        if san.is_valid():
            san.save()
            
            return Response(san.data)
        
        return Response(san.errors)
    elif request.method == "DELETE":
        product_id = request.query_params.get('id')
        if product_id is not None:
            try:
                product_id = int(product_id)
                obj = product_info.objects.get(id=product_id)
                obj.delete()
                return Response({"message": f"Product with id {product_id} deleted successfully."})
            except (ValueError, product_info.DoesNotExist):
                return Response({"error": f"Invalid or non-existing product ID: {product_id}"})
        else:
            return Response({"error": "Product ID not provided in the request."})

class sale(APIView):
    def get(self,request) :
        # Filter coupon objects for the logged-in user
        
        obj=Sale.objects.all()
        san = SaleSerializer(obj, many=True)
        return Response(san.data)
    

    def post(self,request) : 
        san = SaleSerializer(data=request.data)
        print('---->',san)
        if san.is_valid():
            print('---->valid')
            san.save()
            return Response(san.data)
        return Response(san.errors)

    def patch(self,request):
        data = request.data[0]
        print('********',data)
        # Filter by user and object id
        obj = Sale.objects.filter(name=data['name']).first()
        if obj:
            san = SaleSerializer(obj, data=data, partial=True)
            if san.is_valid():
                san.save()
                return Response(san.data)
            return Response(san.errors)
        return Response({'error': 'Object not found for the logged-in user'}, status=status.HTTP_404_NOT_FOUND)
    
    def delete(self,request):
        print('================>',request.data)
        sid=request.data[0]['id']
        print('**',sid)
        if sid is not None:
            try:
                sid = int(sid)
                obj = Sale.objects.get(id=sid)
                obj.delete()
                return Response({"message": f"Product with id {sid} deleted successfully."})
            except (ValueError, sale.DoesNotExist):
                return Response({"error": f"Invalid or non-existing product ID: {sid}"})
        else:
            return Response({"error": "Product ID not provided in the request."})

        


env = environ.Env()
environ.Env.read_env()







############## Paytm Payment Gateway #############

@api_view(['POST'])
def start_payment(request):
    # request.data is coming from frontend
    amount = request.data['amount']
    name = request.data['name']
    email = request.data['email']

    # we are saving an order instance (keeping isPaid=False)
    order = Order.objects.create(product_name=name,
                                 order_amount=amount,
                                 user_email=email, )

    serializer = OrderSerializer(order)
    # we have to send the param_dict to the frontend
    # these credentials will be passed to paytm order processor to verify the business account
    param_dict = {
        'MID': env('MERCHANTID'),
        'ORDER_ID': str(order.id),
        'TXN_AMOUNT': str(amount),
        'CUST_ID': email,
        'INDUSTRY_TYPE_ID': 'Retail',
        'WEBSITE': 'WEBSTAGING',
        'CHANNEL_ID': 'WEB',
        'CALLBACK_URL': 'http://127.0.0.1:8000/api/handlepayment/',
        # this is the url of handlepayment function, paytm will send a POST request to the fuction associated with this CALLBACK_URL
    }

    # create new checksum (unique hashed string) using our merchant key with every paytm payment
    param_dict['CHECKSUMHASH'] = Checksum.generate_checksum(param_dict, env('MERCHANTKEY'))
    # send the dictionary with all the credentials to the frontend
    return Response({'param_dict': param_dict})


@api_view(['POST'])
def handlepayment(request):
    checksum = ""
    # the request.POST is coming from paytm
    form = request.POST

    response_dict = {}
    order = None  # initialize the order varible with None

    for i in form.keys():
        response_dict[i] = form[i]
        if i == 'CHECKSUMHASH':
            # 'CHECKSUMHASH' is coming from paytm and we will assign it to checksum variable to verify our paymant
            checksum = form[i]

        if i == 'ORDERID':
            # we will get an order with id==ORDERID to turn isPaid=True when payment is successful
            order = Order.objects.get(id=form[i])

    # we will verify the payment using our merchant key and the checksum that we are getting from Paytm request.POST
    verify = Checksum.verify_checksum(response_dict, env('MERCHANTKEY'), checksum)

    if verify:
        if response_dict['RESPCODE'] == '01':
            # if the response code is 01 that means our transaction is successfull
            print('order successful')
            # after successfull payment we will make isPaid=True and will save the order
            order.isPaid = True
            order.save()
            # we will render a template to display the payment status
            return render(request, 'paytm/paymentstatus.html', {'response': response_dict})
        else:
            print('order was not successful because' + response_dict['RESPMSG'])
            return render(request, 'paytm/paymentstatus.html', {'response': response_dict})

/**
 * PackageMovementInformationServiceSoapBindingStub.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.fedex.ws.packagemovementinformationservice.v5;

public class PackageMovementInformationServiceSoapBindingStub extends org.apache.axis.client.Stub implements com.fedex.ws.packagemovementinformationservice.v5.PackageMovementInformationPortType {
    private java.util.Vector cachedSerClasses = new java.util.Vector();
    private java.util.Vector cachedSerQNames = new java.util.Vector();
    private java.util.Vector cachedSerFactories = new java.util.Vector();
    private java.util.Vector cachedDeserFactories = new java.util.Vector();

    static org.apache.axis.description.OperationDesc [] _operations;

    static {
        _operations = new org.apache.axis.description.OperationDesc[2];
        _initOperationDesc1();
    }

    private static void _initOperationDesc1(){
        org.apache.axis.description.OperationDesc oper;
        org.apache.axis.description.ParameterDesc param;
        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("postalCodeInquiry");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "PostalCodeInquiryRequest"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "PostalCodeInquiryRequest"), com.fedex.ws.packagemovementinformationservice.v5.PostalCodeInquiryRequest.class, false, false);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "PostalCodeInquiryReply"));
        oper.setReturnClass(com.fedex.ws.packagemovementinformationservice.v5.PostalCodeInquiryReply.class);
        oper.setReturnQName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "PostalCodeInquiryReply"));
        oper.setStyle(org.apache.axis.constants.Style.DOCUMENT);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        _operations[0] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("serviceAvailability");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ServiceAvailabilityRequest"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ServiceAvailabilityRequest"), com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityRequest.class, false, false);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ServiceAvailabilityReply"));
        oper.setReturnClass(com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityReply.class);
        oper.setReturnQName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ServiceAvailabilityReply"));
        oper.setStyle(org.apache.axis.constants.Style.DOCUMENT);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        _operations[1] = oper;

    }

    public PackageMovementInformationServiceSoapBindingStub() throws org.apache.axis.AxisFault {
         this(null);
    }

    public PackageMovementInformationServiceSoapBindingStub(java.net.URL endpointURL, javax.xml.rpc.Service service) throws org.apache.axis.AxisFault {
         this(service);
         super.cachedEndpoint = endpointURL;
    }

    public PackageMovementInformationServiceSoapBindingStub(javax.xml.rpc.Service service) throws org.apache.axis.AxisFault {
        if (service == null) {
            super.service = new org.apache.axis.client.Service();
        } else {
            super.service = service;
        }
        ((org.apache.axis.client.Service)super.service).setTypeMappingVersion("1.2");
            java.lang.Class cls;
            javax.xml.namespace.QName qName;
            javax.xml.namespace.QName qName2;
            java.lang.Class beansf = org.apache.axis.encoding.ser.BeanSerializerFactory.class;
            java.lang.Class beandf = org.apache.axis.encoding.ser.BeanDeserializerFactory.class;
            java.lang.Class enumsf = org.apache.axis.encoding.ser.EnumSerializerFactory.class;
            java.lang.Class enumdf = org.apache.axis.encoding.ser.EnumDeserializerFactory.class;
            java.lang.Class arraysf = org.apache.axis.encoding.ser.ArraySerializerFactory.class;
            java.lang.Class arraydf = org.apache.axis.encoding.ser.ArrayDeserializerFactory.class;
            java.lang.Class simplesf = org.apache.axis.encoding.ser.SimpleSerializerFactory.class;
            java.lang.Class simpledf = org.apache.axis.encoding.ser.SimpleDeserializerFactory.class;
            java.lang.Class simplelistsf = org.apache.axis.encoding.ser.SimpleListSerializerFactory.class;
            java.lang.Class simplelistdf = org.apache.axis.encoding.ser.SimpleListDeserializerFactory.class;
            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "Address");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.Address.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "CarrierCodeType");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.CarrierCodeType.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(enumsf);
            cachedDeserFactories.add(enumdf);

            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ClientDetail");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.ClientDetail.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "DayOfWeekType");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.DayOfWeekType.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(enumsf);
            cachedDeserFactories.add(enumdf);

            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "Localization");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.Localization.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "Notification");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.Notification.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "NotificationParameter");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.NotificationParameter.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "NotificationSeverityType");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.NotificationSeverityType.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(enumsf);
            cachedDeserFactories.add(enumdf);

            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "PackagingType");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.PackagingType.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(enumsf);
            cachedDeserFactories.add(enumdf);

            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "PostalCodeInquiryReply");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.PostalCodeInquiryReply.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "PostalCodeInquiryRequest");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.PostalCodeInquiryRequest.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "PostalCodeServiceAreaDescription");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.PostalCodeServiceAreaDescription.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ServiceAvailabilityOption");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityOption.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ServiceAvailabilityReply");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityReply.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ServiceAvailabilityRequest");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityRequest.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ServiceType");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.ServiceType.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(enumsf);
            cachedDeserFactories.add(enumdf);

            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "TransactionDetail");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.TransactionDetail.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "VersionId");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.VersionId.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "WebAuthenticationCredential");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.WebAuthenticationCredential.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "WebAuthenticationDetail");
            cachedSerQNames.add(qName);
            cls = com.fedex.ws.packagemovementinformationservice.v5.WebAuthenticationDetail.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

    }

    protected org.apache.axis.client.Call createCall() throws java.rmi.RemoteException {
        try {
            org.apache.axis.client.Call _call = super._createCall();
            if (super.maintainSessionSet) {
                _call.setMaintainSession(super.maintainSession);
            }
            if (super.cachedUsername != null) {
                _call.setUsername(super.cachedUsername);
            }
            if (super.cachedPassword != null) {
                _call.setPassword(super.cachedPassword);
            }
            if (super.cachedEndpoint != null) {
                _call.setTargetEndpointAddress(super.cachedEndpoint);
            }
            if (super.cachedTimeout != null) {
                _call.setTimeout(super.cachedTimeout);
            }
            if (super.cachedPortName != null) {
                _call.setPortName(super.cachedPortName);
            }
            java.util.Enumeration keys = super.cachedProperties.keys();
            while (keys.hasMoreElements()) {
                java.lang.String key = (java.lang.String) keys.nextElement();
                _call.setProperty(key, super.cachedProperties.get(key));
            }
            // All the type mapping information is registered
            // when the first call is made.
            // The type mapping information is actually registered in
            // the TypeMappingRegistry of the service, which
            // is the reason why registration is only needed for the first call.
            synchronized (this) {
                if (firstCall()) {
                    // must set encoding style before registering serializers
                    _call.setEncodingStyle(null);
                    for (int i = 0; i < cachedSerFactories.size(); ++i) {
                        java.lang.Class cls = (java.lang.Class) cachedSerClasses.get(i);
                        javax.xml.namespace.QName qName =
                                (javax.xml.namespace.QName) cachedSerQNames.get(i);
                        java.lang.Object x = cachedSerFactories.get(i);
                        if (x instanceof Class) {
                            java.lang.Class sf = (java.lang.Class)
                                 cachedSerFactories.get(i);
                            java.lang.Class df = (java.lang.Class)
                                 cachedDeserFactories.get(i);
                            _call.registerTypeMapping(cls, qName, sf, df, false);
                        }
                        else if (x instanceof javax.xml.rpc.encoding.SerializerFactory) {
                            org.apache.axis.encoding.SerializerFactory sf = (org.apache.axis.encoding.SerializerFactory)
                                 cachedSerFactories.get(i);
                            org.apache.axis.encoding.DeserializerFactory df = (org.apache.axis.encoding.DeserializerFactory)
                                 cachedDeserFactories.get(i);
                            _call.registerTypeMapping(cls, qName, sf, df, false);
                        }
                    }
                }
            }
            return _call;
        }
        catch (java.lang.Throwable _t) {
            throw new org.apache.axis.AxisFault("Failure trying to get the Call object", _t);
        }
    }

    public com.fedex.ws.packagemovementinformationservice.v5.PostalCodeInquiryReply postalCodeInquiry(com.fedex.ws.packagemovementinformationservice.v5.PostalCodeInquiryRequest postalCodeInquiryRequest) throws java.rmi.RemoteException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[0]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("postalCodeInquiry");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("", "postalCodeInquiry"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {postalCodeInquiryRequest});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (com.fedex.ws.packagemovementinformationservice.v5.PostalCodeInquiryReply) _resp;
            } catch (java.lang.Exception _exception) {
                return (com.fedex.ws.packagemovementinformationservice.v5.PostalCodeInquiryReply) org.apache.axis.utils.JavaUtils.convert(_resp, com.fedex.ws.packagemovementinformationservice.v5.PostalCodeInquiryReply.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
  throw axisFaultException;
}
    }

    public com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityReply serviceAvailability(com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityRequest serviceAvailabilityRequest) throws java.rmi.RemoteException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[1]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("serviceAvailability");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("", "serviceAvailability"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {serviceAvailabilityRequest});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityReply) _resp;
            } catch (java.lang.Exception _exception) {
                return (com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityReply) org.apache.axis.utils.JavaUtils.convert(_resp, com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityReply.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
  throw axisFaultException;
}
    }

}
